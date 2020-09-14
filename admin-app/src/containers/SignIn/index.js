import React from "react";
import Layout from "../../components/Layouts/index";
import Input from "../../components/UI/input/index";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

/**
 * @author
 * @function SignIn
 **/

const SignIn = (props) => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Input
                label="Email address"
                placeholder="Nhập Email"
                type="email"
                value=""
                onChange={() => {}}
              />
              <Input
                label="Password"
                placeholder="Nhập Mật khẩu"
                type="password"
                value=""
                onChange={() => {}}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignIn;
