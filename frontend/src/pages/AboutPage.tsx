import React from 'react';
import { Col, Container, Row } from '../components/UI/Grid';
import { Spacer } from '../components/UI/spacer/spacer';

function AboutPage() {
  return (
    <Container spacing='large'>
      <h1 className='font-bold'>About</h1>
      <Spacer size={4} />
      <Row>
        <Col lg={4} md={2} sm={3}>
          <section>
            <h4>About chat me</h4>
            <p>
              This is a simple responsive real time Chat application developed
              to keep you in touch with your friends , easy to create an account
              and enjoying a large variety of beautiful colors provided by theme
              on settings page.
            </p>
          </section>
        </Col>
        <Col lg={5} lgOffset={2} md={2} sm={3}>
          <section>
            <h4>Features</h4>
            <ul>
              <li>
                <p>Authentication</p>
              </li>
              <li>
                <p>Real time chat</p>
              </li>

              <li>
                <p>Chat history</p>
              </li>
              <li>
                <p>Emoji, upload images</p>
              </li>
              <li>
                <p>User profile, Edit profile</p>
              </li>
              <li>
                <p>Notifications</p>
              </li>
              <li>
                <p>Large variety of themes </p>
              </li>
              <li>
                <p>Responsive design</p>
              </li>
            </ul>
          </section>
        </Col>
        <Col lg={5} md={2} sm={4}>
          <section>
            <h4>Technologies used</h4>
            <Spacer size={2} />
            <div className='flex gap-8'>
              <div>
                <h5 className='  '>Front-end</h5>
                <ul>
                  <li>
                    <p>Next.js</p>
                  </li>
                  <li>
                    <p>React</p>
                  </li>
                  <li>
                    <p>Tailwind CSS</p>
                  </li>
                  <li>
                    <p>DaisyUI</p>
                  </li>
                  <li>
                    <p>Zustand</p>
                  </li>
                  <li>
                    <p>React-hook-form</p>
                  </li>

                  <li>
                    <p>zod</p>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className='  '>Back-end</h5>
                <ul>
                  <li>
                    <p>Node.js</p>
                  </li>
                  <li>
                    <p>Express.js</p>
                  </li>
                  <li>
                    <p>MongoDB</p>
                  </li>
                  <li>
                    <p>Socket.io</p>
                  </li>
                  <li>
                    <p>JWT</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Col>
        <Col lg={4} lgOffset={1} md={2} sm={3}>
          <section>
            <h4>How to use</h4>
            <p>
              Very simple :) , to use this application you just need to create
              an account. Once you have an account, you can start chatting with
              your friends.
            </p>
            <p>
              This app was made as an example of my current skills as a
              full-stack dev, so In order to simplify the authentication for
              people who want to test the app i didn’t implement email
              verification ,so here you do not need to use your real email
              account on sign up, its enough to add any email which wasn’t
              registered before on this app and you are good to go.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
