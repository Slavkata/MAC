"""empty message

Revision ID: 6965a8251dbe
Revises: 
Create Date: 2019-05-10 00:04:51.362013

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '6965a8251dbe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('campingspot',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=100), nullable=False),
                    sa.Column('location', sa.String(length=100), nullable=False),
                    sa.Column('capacity', sa.Integer(), nullable=True),
                    sa.Column('price', sa.Float(), nullable=True),
                    sa.Column('reserved', sa.Boolean(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('campingspot')
    # ### end Alembic commands ###
