import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../Sidebar/Sidebar";

export default function Profile() {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection />
    </section>
  );
}
