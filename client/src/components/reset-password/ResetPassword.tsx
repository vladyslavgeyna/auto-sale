import { useSendResetPasswordEmail } from '@/hooks/useSendResetPasswordEmail'
import { useUserStore } from '@/store/user'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/AlertDialog'
import { Button } from '../ui/Button'

const ResetPassword = () => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const {
		mutate: sendResetPasswordEmail,
		isPending: isSendingPasswordPending,
	} = useSendResetPasswordEmail()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className='w-full mt-3'
					variant={'outline'}
					type='button'>
					{isSendingPasswordPending ? (
						<Loader2 className='animate-spin h-6 w-6' />
					) : (
						<>
							<span>Reset password</span>
						</>
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogCancel className='hover:bg-inherit hover:text-slate-700 border-none absolute top-0 right-0'>
					&#88;
				</AlertDialogCancel>
				<AlertDialogHeader>
					<AlertDialogTitle>Reset password</AlertDialogTitle>
					<AlertDialogDescription>
						To reset password you will receive an email on{' '}
						{user.email} with a link to reset your password
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => sendResetPasswordEmail(user.email)}>
						Get email
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ResetPassword
