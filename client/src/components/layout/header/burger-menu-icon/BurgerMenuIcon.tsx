import styles from './BurgerMenuIcon.module.css'

interface PropsType {
	open: boolean
	onClick: () => void
}

const BurgerMenuIcon = ({ open, onClick }: PropsType) => {
	return (
		<div
			onClick={onClick}
			className={`relative z-40 ${styles.headerBurger} ${
				open ? styles.active : ''
			}
			`}>
			<span></span>
		</div>
	)
}

export default BurgerMenuIcon
