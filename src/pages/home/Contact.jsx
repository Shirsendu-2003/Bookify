import { useState } from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import Navbar from
"../../components/layout/Navbar";

import Footer from
"../../components/layout/Footer";

import Button from
"../../components/common/Button";

import Input from
"../../components/common/Input";

import TextArea from
"../../components/common/TextArea";

import {
  validateEmail,
  validateName,
} from "../../utils/validators";

import contactService
from "../../services/contactService";

import {
  showSuccess,
  showError,
} from "../../utils/swal";
import ScrollButton from "../../components/common/ScrollButton";

export default function Contact(){

  const [form,setForm] =
    useState({

      name:"",

      email:"",

      subject:"",

      message:"",

    });

  const [loading,
    setLoading
  ] = useState(false);

  const handleChange =
    (e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value,

    });

  };

 const handleSubmit =
  async(e)=>{

  e.preventDefault();

  const nameError =

    validateName(
      form.name
    );

  const emailError =

    validateEmail(
      form.email
    );

  if(

    nameError ||

    emailError ||

    !form.message

  ){

    return showError(

      "Validation Error",

      "Please fill all required fields."

    );

  }

  try{

    setLoading(true);

    await contactService
      .sendMessage(form);

    showSuccess(

      "Message Sent",

      "We will contact you soon."

    );

    setForm({

      name:"",

      email:"",

      subject:"",

      message:"",

    });

  }catch(error){

    showError(

      "Submission Failed",

      error.response?.data?.message ||

      "Unable to send message."

    );

  }finally{

    setLoading(false);

  }

};

  return(

    <>

      <Navbar />

      <main
        className="

bg-slate-50
min-h-screen

"

      >

        {/* HERO */}

        <section
          className="

bg-gradient-to-r
from-blue-700
to-indigo-700

text-white
py-24

"

        >

          <div
            className="

max-w-7xl
mx-auto
px-6

text-center

"

          >

            <h1
              className="

text-5xl
font-extrabold
mb-6

"

            >

              Contact Us

            </h1>

            <p
              className="

text-blue-100
text-lg

max-w-3xl
mx-auto

"

            >

              Have questions,
              feedback or support
              requests? We'd love
              to hear from you.

            </p>

          </div>

        </section>

        {/* CONTACT */}

        <section
          className="

max-w-7xl
mx-auto
px-6
py-24

"

        >

          <div
            className="

grid
lg:grid-cols-2
gap-16

"

          >

            {/* FORM */}

            <div
              className="

bg-white
rounded-3xl
shadow-lg
p-10

"

            >

              <h2
                className="

text-3xl
font-bold
mb-10

"

              >

                Send Message

              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
                className="
space-y-6
"
              >

                <Input
                  label="Name"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Input
                  label="Subject"
                  name="subject"
                  value={
                    form.subject
                  }
                  onChange={
                    handleChange
                  }
                />

                <TextArea
                  label="Message"
                  name="message"
                  rows={6}
                  value={
                    form.message
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Button
                  type="submit"
                  loading={
                    loading
                  }
                  fullWidth
                >

                  Send Message

                </Button>

              </form>

            </div>

            {/* INFO */}

            <div className="space-y-8">

              <div
                className="

bg-white
rounded-3xl
shadow-sm
p-8

flex
gap-6

"

              >

                <FaEnvelope
                  className="
text-blue-700
text-3xl
"
                />

                <div>

                  <h3
                    className="
font-bold
mb-2
"
                  >

                    Email

                  </h3>

                  <p
                    className="
text-slate-600
"
                  >

                    support@servicehub.com

                  </p>

                </div>

              </div>

              <div
                className="

bg-white
rounded-3xl
shadow-sm
p-8

flex
gap-6

"

              >

                <FaPhoneAlt
                  className="
text-blue-700
text-3xl
"
                />

                <div>

                  <h3
                    className="
font-bold
mb-2
"
                  >

                    Phone

                  </h3>

                  <p
                    className="
text-slate-600
"
                  >

                    +91 9876543210

                  </p>

                </div>

              </div>

              <div
                className="

bg-white
rounded-3xl
shadow-sm
p-8

flex
gap-6

"

              >

                <FaMapMarkerAlt
                  className="
text-blue-700
text-3xl
"
                />

                <div>

                  <h3
                    className="
font-bold
mb-2
"
                  >

                    Address

                  </h3>

                  <p
                    className="
text-slate-600
"
                  >

                    Kolkata,
                    West Bengal,
                    India

                  </p>

                </div>

              </div>

              <div
                className="

bg-white
rounded-3xl
shadow-sm
p-8

flex
gap-6

"

              >

                <FaClock
                  className="
text-blue-700
text-3xl
"
                />

                <div>

                  <h3
                    className="
font-bold
mb-2
"
                  >

                    Hours

                  </h3>

                  <p
                    className="
text-slate-600
"
                  >

                    Mon–Sat
                    9AM – 7PM

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
      <ScrollButton />

    </>

  );

}