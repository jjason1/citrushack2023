import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/sendgrid';
import { getSession } from 'next-auth/react';

export default async function remindCheckIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session && session.user.admin) {
    const { users } = req.body;

    // send email notification to remind user to apply
    for (let i = 0; i < users.length; i++) {
      await sendEmail({
        email: users[i].email,
        template_id:
          process.env.SENDGRID_APPLICATION_CHECK_IN_REMINDER_TEMPLATE_ID,
        name: '',
        members: '',
        invite_code: '',
        newcomer: ''
      });
    }

    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
}
