import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sid = process.env.TWILIO_SID;

export default async function SendOTPFunc(num) {
    const client = twilio(accountSid, authToken);

    // TODO: custom code
	try {
		const codeSent = await client.verify.v2
			.services(sid)
			.verifications.create({
				to: num,
				channel: "sms",
			});

		return '123544'; // TODO: random code for now
	} catch (err) {
		console.log(err);
		throw new Error("Couldn't send OTP to the given number");
	}
}
