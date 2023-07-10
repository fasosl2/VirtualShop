import styled from 'styled-components';

export const Footer = styled.footer`
padding: 40px 20px;
background: var(--background-secondary, #475C6D);
bottom: 0;
width: 100%;


@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const FooterLink = styled.a`
color: #fff;
text-decoration: none;

&:hover {
	color: red;
	transition: 200ms ease-in;
}
`;

export const FooterText = styled.p`
color: #fff;
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
font-weight: bold;
`;
export const SubHeading = styled.p`
color: #fff;
`;
