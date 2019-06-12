import qrcode


def generate(ticket_number):
    filename = './QrCodes/' + ticket_number.__str__() + '.png'
    file = open(filename, 'wb')
    img = qrcode.make(ticket_number)
    img.save(file)


if __name__ == '__main__':
    generate(33211)
