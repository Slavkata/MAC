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
