"""empty message

Revision ID: 8cf28ebb4aab
Revises: 
Create Date: 2019-05-03 16:51:32.165974

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '8cf28ebb4aab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Shop',
                    sa.Column('shop_number', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=True),
                    sa.PrimaryKeyConstraint('shop_number')
                    )
    op.create_table('Ticket',
                    sa.Column('ticket_number', sa.Integer(), nullable=False),
                    sa.Column('price', sa.Float(), nullable=True),
                    sa.PrimaryKeyConstraint('ticket_number')
                    )
    op.create_table('AccountDeposit',
                    sa.Column('deposit_number', sa.Integer(), nullable=False),
                    sa.Column('ticket_number', sa.Integer(), nullable=True),
                    sa.Column('amount', sa.Float(), nullable=True),
                    sa.ForeignKeyConstraint(['ticket_number'], ['Ticket.ticket_number'], ),
                    sa.PrimaryKeyConstraint('deposit_number')
                    )
    op.create_table('Client',
                    sa.Column('ticket_number', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=True),
                    sa.Column('status', sa.Boolean(), nullable=True),
                    sa.Column('ongoing_loan', sa.Boolean(), nullable=True),
                    sa.ForeignKeyConstraint(['ticket_number'], ['Ticket.ticket_number'], ),
                    sa.PrimaryKeyConstraint('ticket_number')
                    )
    op.create_table('LoanItem',
                    sa.Column('item_number', sa.Integer(), nullable=False),
                    sa.Column('shop_number', sa.Integer(), nullable=True),
                    sa.Column('price', sa.Float(), nullable=True),
                    sa.Column('loan_order', sa.Integer(), nullable=True),
                    sa.Column('description', sa.String(), nullable=True),
                    sa.Column('available', sa.Boolean(), nullable=True),
                    sa.Column('name', sa.String(), nullable=True),
                    sa.ForeignKeyConstraint(['shop_number'], ['Shop.shop_number'], ),
                    sa.PrimaryKeyConstraint('item_number')
                    )
    op.create_table('PaymentAccount',
                    sa.Column('ticket_number', sa.Integer(), nullable=False),
                    sa.Column('balance', sa.Float(), nullable=True),
                    sa.ForeignKeyConstraint(['ticket_number'], ['Ticket.ticket_number'], ),
                    sa.PrimaryKeyConstraint('ticket_number')
                    )
    op.create_table('ShopItem',
                    sa.Column('item_number', sa.Integer(), nullable=False),
                    sa.Column('shop_number', sa.Integer(), nullable=True),
                    sa.Column('name', sa.String(), nullable=True),
                    sa.Column('price', sa.Float(), nullable=True),
                    sa.ForeignKeyConstraint(['shop_number'], ['Shop.shop_number'], ),
                    sa.PrimaryKeyConstraint('item_number')
                    )
    op.create_table('LoanOrder',
                    sa.Column('order_number', sa.Integer(), nullable=False),
                    sa.Column('client_number', sa.Integer(), nullable=True),
                    sa.Column('return_time', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['client_number'], ['Client.ticket_number'], ),
                    sa.PrimaryKeyConstraint('order_number')
                    )
    op.create_table('SaleOrder',
                    sa.Column('sale_number', sa.Integer(), nullable=False),
                    sa.Column('client_number', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['client_number'], ['Client.ticket_number'], ),
                    sa.PrimaryKeyConstraint('sale_number')
                    )
    op.create_table('LoanOrderItem',
                    sa.Column('item_number', sa.Integer(), nullable=False),
                    sa.Column('order_number', sa.Integer(), nullable=False),
                    sa.Column('price', sa.Float(), nullable=True),
                    sa.ForeignKeyConstraint(['item_number'], ['LoanItem.item_number'], ),
                    sa.ForeignKeyConstraint(['order_number'], ['LoanOrder.order_number'], ),
                    sa.PrimaryKeyConstraint('item_number', 'order_number')
                    )
    op.create_table('SaleOrderItems',
                    sa.Column('sale_number', sa.Integer(), nullable=False),
                    sa.Column('item_number', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['item_number'], ['ShopItem.item_number'], ),
                    sa.ForeignKeyConstraint(['sale_number'], ['SaleOrder.sale_number'], ),
                    sa.PrimaryKeyConstraint('sale_number', 'item_number')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('SaleOrderItems')
    op.drop_table('LoanOrderItem')
    op.drop_table('SaleOrder')
    op.drop_table('LoanOrder')
    op.drop_table('ShopItem')
    op.drop_table('PaymentAccount')
    op.drop_table('LoanItem')
    op.drop_table('Client')
    op.drop_table('AccountDeposit')
    op.drop_table('Ticket')
    op.drop_table('Shop')
    # ### end Alembic commands ###
