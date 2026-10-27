export const contactInterests = ['UI design', 'Website', 'Web application', 'Something else'];
export type ContactFields = { name: string; email: string; project: string; interest: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(input: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const project = input.project.trim();
  if (!name || name.length > 100 || /[\r\n\u0000-\u001f\u007f]/u.test(name)) errors.name = 'Enter your name using 1–100 characters.';
  if (/[\u0000-\u001f\u007f]/u.test(input.email) || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u.test(email)) errors.email = 'Enter a valid email address, such as kavin@example.com.';
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(input.project)) errors.project = 'Remove unsupported control characters from your message.';
  else if (project.length < 10 || project.length > 2000) errors.project = 'Please use 10–2,000 characters to describe your idea.';
  else if (/\[(?:describe|your|tell me|for example|optional|add|share|list|link|introduce|suggest|write)[^\]]*\]/iu.test(project)) errors.project = 'Replace or remove the bracketed template prompts before continuing.';
  if (!contactInterests.includes(input.interest)) errors.interest = 'Choose one of the project types above.';
  return errors;
}

export function createWhatsAppDraft(input: ContactFields): string {
  if (Object.keys(validateContact(input)).length) throw new Error('Invalid contact details');
  const body = `Hi Mohan,\n\n${input.project.trim()}\n\nInterested in: ${input.interest}\nName: ${input.name.trim()}\nReply email: ${input.email.trim()}`;
  return `https://wa.me/917200470762?text=${encodeURIComponent(body.toWellFormed())}`;
}
