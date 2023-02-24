export const emailTemplateGenerator = ({ email, link }) => {
    return `
        <h2>Hey ${email}</h2>
        <p>Here's the login link you just requested:</p>
        <a href="${link}">Click here to login</p>
    `;
};
