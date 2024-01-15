'use client'
import { useSendResetPasswordEmail } from '@/hooks/useSendResetPasswordEmail'
import { isEmail } from '@/utils/validation'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
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
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

const ResetPasswordUnlogged = () => {
	const [email, setEmail] = useState('')

	const {
		mutate: sendResetPasswordEmail,
		isPending: isSendingPasswordPending,
	} = useSendResetPasswordEmail(() => {
		setEmail('')
	})

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
							<span>Forgot password</span>
						</>
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogCancel className='hover:bg-inherit hover:text-slate-700 border-none absolute top-0 right-0'>
					&#88;
				</AlertDialogCancel>
				<AlertDialogHeader>
					<AlertDialogTitle>Forgot password?</AlertDialogTitle>
					<AlertDialogDescription>
						To reset password you will receive an email on with a
						link to reset your password
						<div className='mt-2 text-primary'>
							<Label>
								Enter an email address you have registered with
							</Label>
							<Input
								id='email'
								placeholder='Email'
								type='email'
								required
								className='mt-1 text-black'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={!isEmail(email)}
						onClick={() => sendResetPasswordEmail(email)}>
						Get email
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ResetPasswordUnlogged
