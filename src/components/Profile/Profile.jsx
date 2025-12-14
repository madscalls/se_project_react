import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../Sidebar/Sidebar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
