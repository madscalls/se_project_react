import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
