export type EmailSubmission = {
  form_type: string;
  name: string;
  email: string;
  phone: string;
  show: string;
  reason: string;
  quantity: string;
  row: string;
  price: string;
  submitted_at: string;
};

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendEmailSubmission(parameters: EmailSubmission) {
  if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
    throw new Error("EmailJS environment variables are not configured.");
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailJsServiceId,
      template_id: emailJsTemplateId,
      user_id: emailJsPublicKey,
      template_params: parameters,
    }),
  });

  if (!response.ok) {
    throw new Error("EmailJS could not send the submission.");
  }
}
