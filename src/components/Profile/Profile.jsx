import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../Sidebar/Sidebar";

export default function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} />
    </section>
  );
}
