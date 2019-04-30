"""empty message

Revision ID: 8b521c76bfb8
Revises: 
Create Date: 2019-05-13 21:16:20.036380

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b521c76bfb8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('review',
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.Column('publisher', sa.String(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('review_id')
    )
    op.create_table('tickets',
    sa.Column('ticket_number', sa.String(length=8), nullable=False),
    sa.Column('firstname', sa.String(length=30), nullable=False),
    sa.Column('lastname', sa.String(length=30), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=False),
    sa.Column('price', sa.Float(precision=2), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('ticket_number')
    )
    op.create_table('account_deposists',
    sa.Column('deposit_number', sa.Integer(), nullable=False),
    sa.Column('ticket_number', sa.String(length=8), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['ticket_number'], ['tickets.ticket_number'], ),
    sa.PrimaryKeyConstraint('deposit_number')
    )
    op.create_table('campingspot',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_number', sa.String(length=8), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('reserved', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['ticket_number'], ['tickets.ticket_number'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment_accounts',
    sa.Column('ticket_number', sa.String(length=8), nullable=False),
    sa.Column('balance', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['ticket_number'], ['tickets.ticket_number'], ),
    sa.PrimaryKeyConstraint('ticket_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('payment_accounts')
    op.drop_table('campingspot')
    op.drop_table('account_deposists')
    op.drop_table('tickets')
    op.drop_table('review')
    # ### end Alembic commands ###