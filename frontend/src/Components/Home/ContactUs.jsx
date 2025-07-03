import { MdOutlineEmail } from "react-icons/md";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";
import { useAddContactMsgMutation } from "../../Redux/contactMsg/contactMsgApi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function ContactUs() {
  const { data } = useGetContactsQuery();
  const contacts = data?.data;

  const [addContactMsg, { isLoading }] = useAddContactMsgMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    if (name === "" || phone === "" || message === "") {
      return alert("All fields are required");
    }

    try {
      const res = await addContactMsg({ name, phone, email, message });
      if (res?.data?.success) {
        e.target.reset();
        Swal.fire("", "Message sent successfully", "success");
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
      }
    } catch (error) {
      alert("An error occurred. Please try again");
    }
  };

  return (
    <section className="bg-stone-100 py-14 sm:py-24">
      <div className="container">
        <div className="grid gap-10 sm:grid-cols-2 items-start">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral mb-4">
              Tell us about your project
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              We can help you elevate your customer experiences.
            </p>

            <div className="mt-10">
              <p className="text-base text-gray-500 mb-1">Or drop an email at</p>
              <a
                href={`mailto:${contacts?.email}`}
                className="flex items-center gap-2 text-xl text-primary font-medium hover:underline"
              >
                <MdOutlineEmail size={22} />
                {contacts?.email}
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleAdd}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-primary"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone*"
                className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-primary"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Message*"
                className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-primary"
              ></textarea>
              <button
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 transition text-white py-3 rounded font-medium"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
