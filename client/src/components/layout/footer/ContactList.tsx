import { BsFacebook, BsInstagram, BsTelegram } from 'react-icons/bs'
import ContactItem from './ContactItem'

const ContactList = () => {
	return (
		<ul className='flex items-center text-xl gap-2'>
			<ContactItem
				link='https://t.me/what_is_lovechik'
				iconComponent={<BsTelegram />}
			/>
			<ContactItem
				link='https://www.instagram.com/_what_is_lovechik_/'
				iconComponent={<BsInstagram />}
			/>
			<ContactItem
				link='https://www.facebook.com/profile.php?id=100072210826751'
				iconComponent={<BsFacebook />}
			/>
		</ul>
	)
}

export default ContactList
