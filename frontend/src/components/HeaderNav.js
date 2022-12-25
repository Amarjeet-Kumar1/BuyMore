import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function HeaderNav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>BuyMore</Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}
