
from models.deposit import AccountDeposit



def main():
	f = open("/Users/aimet/Desktop/deposit.txt", "r")
	t = f.read()
	f.close()
	name = t.split('\n')
	ticket_number = name[4:]
	dticket = ""
	damount = ""
	i = 0
	while i < len(ticket_number):
		new = ticket_number[i].split(' ')
		dticket = new[0]
		damount = new[1]
		AccountDeposit(dticket, damount)
		i += 1


'''
def deposit():
    filename = './Atmlogs' + ticket_number.__str__() + '.txt'

    for f in range(len(filename)):
        name = 

'''