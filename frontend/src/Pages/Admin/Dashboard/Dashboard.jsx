import { FaUserShield } from "react-icons/fa";
import { useGetAdminsQuery } from "../../../Redux/user/userApi";
import Spinner from "../../../Components/Spinner/Spinner";
import { MdFeaturedPlayList } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import { useGetProjectsQuery } from "../../../Redux/projects/projectsApi";
import { useGetFeatureProjectsQuery } from "../../../Redux/featureProject/featureProjectApi";
import { useGetAllContactMsgsQuery } from "../../../Redux/contactMsg/contactMsgApi";
import { useGetDirectorQuery } from "../../../Redux/director/directorApi";
import ContactMsgList from "../ContactMsg/ContactMsgList";

export default function Dashboard() {
  const { data: users, isLoading: userLoading } = useGetAdminsQuery();

  const { data } = useGetProjectsQuery();
  const projects = data?.data;

  const { data: featureProject } = useGetFeatureProjectsQuery();
  const feature = featureProject?.data;

  const { data: clientMsg } = useGetAllContactMsgsQuery();
  const clientMessages = clientMsg?.data;

  if (userLoading) return <Spinner />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid gap-1 sm:grid-cols-4 sm:gap-4">
          <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
            <div>
              <p className="font-dinMedium text-neutral">Total Admin</p>
              <h3 className="font-bold text-primary">{users?.data?.length}</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
              <FaUserShield className="text-xl" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
            <div>
              <p className="font-dinMedium text-neutral">Client Message</p>
              <h3 className="font-bold text-primary">
                {clientMessages?.length}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
              <IoMail className="text-xl" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
            <div>
              <p className="font-dinMedium text-neutral">Total Project</p>
              <h3 className="font-bold text-primary">{projects?.length}</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
              <MdFeaturedPlayList className="text-xl" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
            <div>
              <p className="font-dinMedium text-neutral">
                Total Feature Project
              </p>
              <h3 className="font-bold text-primary">{feature?.length}</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
              <FcAbout className="text-xl" />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <ContactMsgList />
        </div>
      </div>
    </section>
  );
}
