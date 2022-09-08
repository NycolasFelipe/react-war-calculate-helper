import * as C from './styles';

function Footer() {
  return (
    <C.Footer>
      <C.Header>Find out more about my work!</C.Header>
      <C.Content>
        <C.Link target={'_blank'} href='https://github.com/NycolasFelipe'>
          <C.LinkImage src={'../../images/github.png'} />
          <C.LinkText>GitHub</C.LinkText>
        </C.Link>
        <C.Link
          target={'_blank'}
          href='https://www.linkedin.com/in/nycolas-felipe-louren%C3%A7o-0448b6150/'
        >
          <C.LinkImage src={'../../images/email.png'} />
          <C.LinkText>Email</C.LinkText>
        </C.Link>
        <C.Link
          target={'_blank'}
          href='https://mail.google.com/mail/?view=cm&fs=1&to=nycolasfelipe.contato@gmail.com&su=CONTACT'
        >
          <C.LinkImage src={'../../images/linkedin.png'} />
          <C.LinkText>LinkedIn</C.LinkText>
        </C.Link>
      </C.Content>
      <C.Copyright>© 2022 Copyright — Designed by NycolasFelipe</C.Copyright>
    </C.Footer>
  );
}

export default Footer;
