import { NewMarketplaceForm } from "./NewMarketplaceForm";

export default async function NewMarketplacePage() {
  console.log("NewMarketplacePage");

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>New Marketplace</p>
        <NewMarketplaceForm />
      </div>
    </div>
  );
}
