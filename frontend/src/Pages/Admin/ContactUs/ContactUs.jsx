import { useState, useEffect } from "react";
import swal from "sweetalert2";
import {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
} from "../../../Redux/contact/contactApi.js";

export default function ContactUs() {
  const { data, isLoading } = useGetContactsQuery();
  const contactUs = data?.data;
  const id = contactUs?._id;

  const [addContact, { isLoading: addIsLoading }] = useAddContactMutation();
  const [updateContact, { isLoading: updateIsLoading }] =
    useUpdateContactMutation();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotNumber, setHotNumber] = useState("");
  const [address, setAddress] = useState("");
  const [wpLink, setWpLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    if (contactUs) {
      setEmail(contactUs.email || "");
      setPhone(contactUs.phone || "");
      setHotNumber(contactUs.hotNumber || "");
      setAddress(contactUs.address || "");
      setWpLink(contactUs.wpLink || "");
      setFacebookLink(contactUs.facebookLink || "");
      setTwitterLink(contactUs.twitterLink || "");
      setLinkedinLink(contactUs.linkedinLink || "");
      setYoutubeLink(contactUs.youtubeLink || "");
    }
  }, [contactUs]);

  const handleAddUpdate = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      phone,
      hotNumber,
      address,
      wpLink,
      facebookLink,
      twitterLink,
      linkedinLink,
      youtubeLink,
    };

    try {
      let res;
      if (id) {
        res = await updateContact({ id, info: formData }).unwrap();
      } else {
        res = await addContact(formData).unwrap();
      }

      if (res?.success) {
        swal.fire(
          "",
          `Contact ${id ? "updated" : "added"} successfully`,
          "success",
        );
      } else {
        swal.fire("", "Something went wrong!", "error");
      }
    } catch (error) {
      swal.fire("", error.message || "Something went wrong!", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Contact Us</h3>
      </div>

      <form className="p-4" onSubmit={handleAddUpdate}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="mb-1">Email</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="mb-1">Phone</p>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="mb-1">Hot Number</p>
            <input
              type="tel"
              name="hotNumber"
              value={hotNumber}
              onChange={(e) => setHotNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="mb-1">Address</p>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <p className="mb-1">Whatsapp Number</p>
            <input
              type="text"
              name="wpLink"
              value={wpLink}
              onChange={(e) => setWpLink(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="mb-1">Facebook Link</p>
            <input
              type="text"
              name="facebookLink"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1">Twitter Link</p>
            <input
              type="text"
              name="twitterLink"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-1">LinkedIn Link</p>
            <input
              type="text"
              name="linkedinLink"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-1">Youtube Link</p>
            <input
              type="text"
              name="youtubeLink"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex gap-2">
            <button
              className="admin_btn"
              disabled={addIsLoading || updateIsLoading}
            >
              {id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
