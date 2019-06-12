import os
from datetime import datetime

from fpdf import FPDF


class PDF(FPDF):
    def chapter_body(self, ticket_number, name, date=datetime.now().date()):
        self.set_font('Arial', '', 16)
        print(os.path.realpath('./'))
        image = './QrCodes/' + ticket_number.__str__() + '.png'
        self.cell(0, 0, 'Ticket: ' + ticket_number.__str__(), ln=1)
        self.cell(0, 16, 'Name: ' + name, ln=1)
        self.cell(0, 32, 'Date: ' + date.__str__(), ln=1)
        self.image(image)

    def print_chapter(self, ticket_number, name):
        self.add_page()
        self.chapter_body(ticket_number, name)


def generate_tickets(ticket_numbers, names):
    for i in range(len(ticket_numbers)):
        pdf = PDF()
        pdf.print_chapter(ticket_numbers[i], names[i])
        pdf.output('./TicketPDF/' + ticket_numbers[i].__str__() + '.pdf', 'F')


if __name__ == '__main__':
    generate_tickets()
