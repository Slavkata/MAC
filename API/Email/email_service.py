from flask_mail import Mail
from flask_mail import Message

mail = Mail()


def ticket_message(recipient, ticket_number):
    message = Message(subject="MAC Tickets", recipients=[recipient], body=
    '''Greetings,
          These are your tickets for the event yay!!!
          Check the attachments. See you there.
          Best Regards,
          The MAC team '''
                      , sender='slavkirilov00@gmail.com')
    filename = './TicketPDF/' + ticket_number.__str__() + '.pdf'
    data = open(filename, 'rb').read()

    message.attach(filename=filename, content_type='application/pdf', data=data)
    mail.send(message)


def camping_message(recipient, camping_spot):
    message = Message(subject="MAC Camping Spots", recipients=[recipient], body=
    '''Greetings,
    you have been invited to this camping spot: {0} 
    Best Regards,
    MAC team'''.format(camping_spot)
                      , sender='slavkirilov00@gmail.com')

    mail.send(message)
