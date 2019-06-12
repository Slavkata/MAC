from models.deposit import AccountDeposit


def deposit(file):
    print(file)
    name = file.splitlines()
    print(name)
    ticket_number = name[4:]
    print(ticket_number)

    for i in range(int(name[3])):
        new = ticket_number[i].split(b' ')
        dticket = new[0].strip()
        damount = new[1].strip()
        AccountDeposit(int(dticket), float(damount)).save_to_db()
