from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from server.extensions import db
from server.models.upload import Upload
from server.schemas.upload_schema import UploadSchema

upload_bp = Blueprint("upload_bp", __name__)
upload_schema = UploadSchema()
uploads_schema = UploadSchema(many=True)


@upload_bp.route("/", methods=["GET"])
def get_uploads():
    """
    Return all uploads, or filter by ?user_id=<id>.
    """
    user_id = request.args.get("user_id")
    query = Upload.query
    if user_id:
        query = query.filter_by(user_id=user_id)
    uploads = query.all()
    return jsonify(uploads_schema.dump(uploads)), 200


@upload_bp.route("/", methods=["POST"])
def create_upload():
    """
    Create a new upload entry.
    Expects JSON matching UploadSchema.
    """
    data = request.get_json(silent=True) or {}
    try:
        validated = upload_schema.load(data)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    new_upload = Upload(**validated)
    db.session.add(new_upload)
    db.session.commit()
    return jsonify(upload_schema.dump(new_upload)), 201


@upload_bp.route("/<int:upload_id>", methods=["DELETE"])
def delete_upload(upload_id):
    """
    Delete a specific upload by ID.
    """
    upload = Upload.query.get_or_404(upload_id)
    db.session.delete(upload)
    db.session.commit()
    return jsonify({"message": f"Upload {upload_id} deleted"}), 200
