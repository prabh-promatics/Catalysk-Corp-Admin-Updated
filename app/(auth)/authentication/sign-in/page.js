// 'use client'

// // import node module libraries
// import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
// import Link from 'next/link';

// // import hooks
// import useMounted from 'hooks/useMounted';

// const SignIn = () => {
//   const hasMounted = useMounted();
//   return (
//     <Row className="align-items-center justify-content-center g-0 min-vh-100">
//       <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
//         {/* Card */}
//         <Card className="smooth-shadow-md">
//           {/* Card body */}
//           <Card.Body className="p-6">
//             <div className="mb-4">
//               <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
//               <p className="mb-6">Please enter your user information.</p>
//             </div>
//             {/* Form */}
//             {hasMounted &&
//               <Form>
//                 {/* Username */}
//                 <Form.Group className="mb-3" controlId="username">
//                   <Form.Label>Username or email</Form.Label>
//                   <Form.Control type="email" name="username" placeholder="Enter address here" required="" />
//                 </Form.Group>

//                 {/* Password */}
//                 <Form.Group className="mb-3" controlId="password">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control type="password" name="password" placeholder="**************" required="" />
//                 </Form.Group>

//                 {/* Checkbox */}
//                 <div className="d-lg-flex justify-content-between align-items-center mb-4">
//                   <Form.Check type="checkbox" id="rememberme">
//                     <Form.Check.Input type="checkbox" />
//                     <Form.Check.Label>Remember me</Form.Check.Label>
//                   </Form.Check>
//                 </div>
//                 <div>
//                   {/* Button */}
//                   <div className="d-grid">
//                     <Button variant="primary" type="submit">Sign In</Button>
//                   </div>
//                   <div className="d-md-flex justify-content-between mt-4">
//                     <div className="mb-2 mb-md-0">
//                       <Link href="/authentication/sign-up" className="fs-5">Create An Account </Link>
//                     </div>
//                     <div>
//                       <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
//                     </div>
//                   </div>
//                 </div>
//               </Form>}

//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   )
// }

// export default SignIn

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Updated for app directory
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap'
import Link from 'next/link'
import Cookies from 'js-cookie' // Import js-cookie to manage cookies

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [hasMounted, setHasMounted] = useState(false)

  const router = useRouter() // Ensure this is used only in a client component

  // Ensure the component is mounted before interacting with the router
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    if (!hasMounted) return // Avoid premature interaction with the router

    try {
      const response = await fetch(
        'https://betazone.promaticstechnologies.com/corporate/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()
      if (response.ok && data.code === 200) {
        console.log('Data received is---', data)
        Cookies.set('authToken', data.data.token, { expires: 7, path: '/' }) // Cookie valid for 7 days
        router.push('/')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    }
  }

  if (!hasMounted) return null // Avoid rendering until the component has mounted

  return (
    <Row className='align-items-center justify-content-center g-0 min-vh-100'>
      <Col xxl={4} lg={6} md={8} xs={12} className='py-8 py-xl-0'>
        <Card className='smooth-shadow-md'>
          <Card.Body className='p-6'>
            <div className='mb-4'>
              {/* <Link href="/">
                <Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="Logo" />
              </Link> */}
              <Link href='/'>
                <Image
                  src='/images/brand/logo/logo.svg'
                  className='signInLogo mb-4'
                  alt=''
                />
              </Link>
              <p className='mb-6'>Please enter your user information.</p>
            </div>
            <Form onSubmit={handleLogin}>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter address here'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='**************'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <p className='text-danger'>{error}</p>}

              {/* <div className="d-grid">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div> */}
              <div className='d-grid'>
                <Button type='submit' className='signInBtn'>
                  Sign In
                </Button>
              </div>

              <div className='d-md-flex justify-content-between mt-4'>
                {/* <div className="mb-2 mb-md-0">
                  <Link href="/authentication/sign-up" className="fs-5">
                    Create An Account
                  </Link>
                </div> */}
                <div>
                  <Link
                    href='/authentication/forget-password'
                    className='text-inherit fs-5'
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignIn
