from flask import Blueprint, jsonify
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from server.extensions import db
from server.models.user import User
from server.models.upload import Upload
from server.models.storage_node import StorageNode
from server.models.allocation import Allocation

dashboard_bp = Blueprint("dashboard_bp", __name__)

@dashboard_bp.route("/stats", methods=["GET"])
def get_dashboard_stats():
    """Get overall dashboard statistics."""
    try:
        # User statistics
        total_users = User.query.count()
        users_this_month = User.query.filter(
            extract('month', User.created_at) == datetime.now().month,
            extract('year', User.created_at) == datetime.now().year
        ).count()
        
        # Upload statistics
        total_uploads = Upload.query.count()
        total_storage_used = db.session.query(func.sum(Upload.size)).scalar() or 0
        
        # Storage node statistics
        total_nodes = StorageNode.query.count()
        active_nodes = StorageNode.query.filter_by(status='active').count()
        total_capacity = db.session.query(func.sum(StorageNode.capacity)).scalar() or 0
        total_used = db.session.query(func.sum(StorageNode.used)).scalar() or 0
        
        # Allocation statistics
        total_allocations = Allocation.query.count()
        
        return jsonify({
            "users": {
                "total": total_users,
                "this_month": users_this_month
            },
            "uploads": {
                "total": total_uploads,
                "total_size": total_storage_used
            },
            "storage_nodes": {
                "total": total_nodes,
                "active": active_nodes,
                "total_capacity": total_capacity,
                "total_used": total_used,
                "utilization_percentage": (total_used / total_capacity * 100) if total_capacity > 0 else 0
            },
            "allocations": {
                "total": total_allocations
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/users-over-time", methods=["GET"])
def get_users_over_time():
    """Get user registration data over time."""
    try:
        # Get last 12 months of user registrations
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        
        users_by_month = db.session.query(
            extract('year', User.created_at).label('year'),
            extract('month', User.created_at).label('month'),
            func.count(User.id).label('count')
        ).filter(
            User.created_at >= start_date
        ).group_by(
            extract('year', User.created_at),
            extract('month', User.created_at)
        ).order_by('year', 'month').all()
        
        data = []
        for row in users_by_month:
            data.append({
                "month": f"{int(row.year)}-{int(row.month):02d}",
                "count": row.count
            })
        
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/uploads-over-time", methods=["GET"])
def get_uploads_over_time():
    """Get upload data over time."""
    try:
        # Get last 12 months of uploads
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        
        uploads_by_month = db.session.query(
            extract('year', Upload.timestamp).label('year'),
            extract('month', Upload.timestamp).label('month'),
            func.count(Upload.id).label('count'),
            func.sum(Upload.size).label('total_size')
        ).filter(
            Upload.timestamp >= start_date
        ).group_by(
            extract('year', Upload.timestamp),
            extract('month', Upload.timestamp)
        ).order_by('year', 'month').all()
        
        data = []
        for row in uploads_by_month:
            data.append({
                "month": f"{int(row.year)}-{int(row.month):02d}",
                "count": row.count,
                "total_size": float(row.total_size) if row.total_size else 0
            })
        
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/storage-utilization", methods=["GET"])
def get_storage_utilization():
    """Get storage node utilization data."""
    try:
        nodes = StorageNode.query.all()
        
        data = []
        for node in nodes:
            utilization = (node.used / node.capacity * 100) if node.capacity > 0 else 0
            data.append({
                "name": node.name,
                "location": node.location,
                "capacity": node.capacity,
                "used": node.used,
                "available": node.capacity - node.used,
                "utilization_percentage": utilization,
                "status": node.status
            })
        
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/user-activity", methods=["GET"])
def get_user_activity():
    """Get user activity data (uploads per user)."""
    try:
        user_activity = db.session.query(
            User.username,
            func.count(Upload.id).label('upload_count'),
            func.sum(Upload.size).label('total_size')
        ).outerjoin(Upload).group_by(User.id, User.username).all()
        
        data = []
        for row in user_activity:
            data.append({
                "username": row.username,
                "upload_count": row.upload_count,
                "total_size": float(row.total_size) if row.total_size else 0
            })
        
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/file-types", methods=["GET"])
def get_file_types():
    """Get file type distribution."""
    try:
        # Get all uploads and process file extensions in Python
        uploads = Upload.query.all()
        
        # Count file types
        file_type_counts = {}
        for upload in uploads:
            if '.' in upload.filename:
                extension = upload.filename.split('.')[-1].lower()
            else:
                extension = 'no_extension'
            
            if extension not in file_type_counts:
                file_type_counts[extension] = {'count': 0, 'total_size': 0}
            
            file_type_counts[extension]['count'] += 1
            file_type_counts[extension]['total_size'] += upload.size
        
        # Convert to list format
        data = []
        for extension, stats in file_type_counts.items():
            data.append({
                "extension": extension,
                "count": stats['count'],
                "total_size": float(stats['total_size'])
            })
        
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
