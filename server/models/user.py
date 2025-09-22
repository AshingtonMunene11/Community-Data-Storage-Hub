from extensions import db 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"





# For now, we are only working on the backend until it is done. I would like to allocate the work according to the plan for the backend. But first, summarize what I have done so far so it can be easy to rely what I have done so far in the backend. Then, show me what specifically I'm allocated to them and their importance. 
