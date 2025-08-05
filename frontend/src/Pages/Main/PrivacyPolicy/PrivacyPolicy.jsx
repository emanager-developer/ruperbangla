import { useEffect } from "react";
import { useGetPrivacyQuery } from "../../../Redux/privacy/privacyApi";
import parse from "html-react-parser";
import Spinner from "../../../Components/Spinner/Spinner";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy - Ruper Bangla";
  }, []);

  const { data, isLoading } = useGetPrivacyQuery();
  const privacy = data?.data;

  const description = privacy?.description && parse(privacy?.description);

  if (isLoading) return <Spinner />;

  return (
    <section className="py-14">
      <div className="container">
        <div>
          <div className="mt-4">{description}</div>
        </div>
      </div>
    </section>
  );
}
