"""empty message

Revision ID: e17ec37a9a7a
Revises: 85ade0fc4761
Create Date: 2019-05-22 04:33:24.253436

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = 'e17ec37a9a7a'
down_revision = '85ade0fc4761'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('shops', 'items_sold',
                    existing_type=sa.INTEGER(),
                    nullable=False)
    op.alter_column('shops', 'profit',
                    existing_type=sa.INTEGER(),
                    nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('shops', 'profit',
                    existing_type=sa.INTEGER(),
                    nullable=True)
    op.alter_column('shops', 'items_sold',
                    existing_type=sa.INTEGER(),
                    nullable=True)
    # ### end Alembic commands ###