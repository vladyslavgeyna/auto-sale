import nodemailer from 'nodemailer'

class EmailService {
	private transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			host: String(process.env.SMTP_HOST),
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: String(process.env.SMTP_USER),
				pass: String(process.env.SMTP_PASSWORD),
			},
		})
	}

	async sendVerificationEmail(emailTo: string, link: string) {
		await this.transporter.sendMail({
			from: String(process.env.SMTP_USER),
			to: emailTo,
			subject: `Account verifying on ${process.env.CLIENT_URL}`,
			text: '',
			html: `
                <table align="center" cellpadding="15" cellspacing="0" width="100%" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 3px solid rgb(112, 44, 249); border-radius: 30px; text-align: center; max-width: 600px; margin: 0 auto;overflow: hidden;">
                    <tr>
                        <td style="background-color: rgb(112, 44, 249); color: white;">
                            <h1 style="margin: 0;"><strong>Help us protect your account</strong></h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p style="font-size: 16px;">Before you sign in, we need to verify your identity.</p>
                            <h3 style="margin: 20px 0; color: rgb(112, 44, 249);">For verifying, follow the <strong><a href="${link}" style="color: rgb(112, 44, 249); text-decoration: none;font-weight: 900;">link</a></strong></h3>
                        </td>
                    </tr>
                </table>
            `,
		})
	}
}

export default new EmailService()
