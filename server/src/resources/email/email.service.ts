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

	async sendResetPasswordEmail(emailTo: string, link: string) {
		await this.transporter.sendMail({
			from: String(process.env.SMTP_USER),
			to: emailTo,
			subject: `Reset password on ${process.env.CLIENT_URL}`,
			text: '',
			html: `
                <table align="center" cellpadding="15" cellspacing="0" width="100%" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 3px solid #242e3e; border-radius: 30px; text-align: center; max-width: 600px; margin: 0 auto;overflow: hidden;">
                    <tr>
                        <td style="background-color: #242e3e; color: white;">
                            <h1 style="margin: 0;"><strong>Reset password</strong></h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
						<h3 style="margin: 20px 0; color: #242e3e;">To continue resting password, follow the <strong><a href="${link}" style="color: #242e3e; text-decoration: none;font-weight: 900;">link</a></strong>. Note that the link will expire in 15 minutes.</h3>
						<p style="font-size: 16px;">
							If you didn't request a password reset, you can ignore this email.
						</p>
                        </td>
                    </tr>
                </table>
            `,
		})
	}

	async sendVerificationEmail(emailTo: string, link: string) {
		await this.transporter.sendMail({
			from: String(process.env.SMTP_USER),
			to: emailTo,
			subject: `Account verifying on ${process.env.CLIENT_URL}`,
			text: '',
			html: `
                <table align="center" cellpadding="15" cellspacing="0" width="100%" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 3px solid #242e3e; border-radius: 30px; text-align: center; max-width: 600px; margin: 0 auto;overflow: hidden;">
                    <tr>
                        <td style="background-color: #242e3e; color: white;">
                            <h1 style="margin: 0;"><strong>Help us protect your account</strong></h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p style="font-size: 16px;">Before you sign in, we need to verify your identity.</p>
                            <h3 style="margin: 20px 0; color: #242e3e;">For verifying, follow the <strong><a href="${link}" style="color: #242e3e; text-decoration: none;font-weight: 900;">link</a></strong></h3>
                        </td>
                    </tr>
                </table>
            `,
		})
	}
}

export default new EmailService()
