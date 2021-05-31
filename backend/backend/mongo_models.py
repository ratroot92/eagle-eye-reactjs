import logging
# from datetime import datetime
from mongoengine import *
from mongoengine import signals
import datetime

"""
Field validation parameter

def not_john_doe(name):
    if name == 'John Doe':
        raise ValidationError("John Doe is not a valid name")

class Person(Document):
    full_name = StringField(validation=not_john_doe)
"""

"""
def update_modified(sender, document):
    document.modified = datetime.utcnow()
"""
class LeadDocument(Document):
    name        =StringField(max_length=255)
    email       =EmailField(max_length=100,unique=True)
    message     =StringField(max_length=100,required=False)
    created_at  =DateField(default=datetime.datetime.now, editable=True)
    # email = EmailField()
    # age = IntField(min_value=0, max_value=99)
"""
signals.pre_save.connect(update_modified)
"""

"""
    def clean(self):
        # Validate that only published essays have a `pub_date`
        if self.status == 'Draft' and self.pub_date is not None:
            raise ValidationError('Draft entries should not have a publication date.')
        # Set the pub_date for published items if not set.
        if self.status == 'Published' and self.pub_date is None:
            self.pub_date = datetime.now()
 """