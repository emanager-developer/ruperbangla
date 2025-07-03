import { MdOutlineEmail } from "react-icons/md";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";
import { useAddContactMsgMutation } from "../../Redux/contactMsg/contactMsgApi";
import Swal from "sweetalert2";

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
    <section className="bg-stone-100 py-10 sm:py-20">
      <div className="container">
        <div className="grid items-start gap-6 sm:grid-cols-2">
          <div className="sm:w-1/2">
            <h2 className="text-5xl sm:text-6xl">Tell us about your project</h2>

            <p className="mt-3 text-lg text-neutral-content">
              We can help you elevate your customer experiences.
            </p>

            <div className="mt-14">
              <p className="text-xl text-neutral-content">
                or drop an email at
              </p>
              <a
                href={`mailto:${contacts?.email}`}
                className="flex items-center gap-2 text-2xl text-[#9e8670]"
              >
                <p>
                  <MdOutlineEmail />
                </p>
                <p>{contacts?.email}</p>
              </a>
            </div>
          </div>

          <form onSubmit={handleAdd}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 p-3"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
            />
            <textarea
              name="message"
              placeholder="Message"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
              rows={5}
            ></textarea>
            <button
              disabled={isLoading}
              className="mt-2 w-full rounded-md bg-primary p-3 text-white"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
