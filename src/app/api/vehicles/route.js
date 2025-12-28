import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "2w" or "3w"

  try {
    // Get products from localStorage (simulated - in real app this would be from database)
    // Since this is server-side, we'll return instructions for client-side loading
    
    // For now, return mock data structure
    // The actual loading will happen on client-side from localStorage
    
    if (type === "2w") {
      return NextResponse.json([
        {
          id: 1,
          name: "2-Wheeler Model 1",
          imageUrl: "/placeholder-2w.jpg",
          range: "Upto-120 km",
          price: "From ₹30,000/-",
          description: "Urban mobility redefined with fast charging and digital display.",
          category: "2-Wheeler",
          topSpeed: "80 km/h",
          features: ["Fast Charging", "Digital Display", "Eco Mode"],
        },
      ]);
    } else if (type === "3w") {
      return NextResponse.json([
        {
          id: 1,
          name: "3-Wheeler Model 1",
          imageUrl: "/placeholder-3w.jpg",
          range: "Upto-150 km",
          price: "From ₹2,15,000/-",
          description: "Built for business with heavy-duty payload capacity.",
          category: "3-Wheeler",
          payload: "500 kg",
          features: ["Heavy Duty", "Long Range", "Low Maintenance"],
        },
      ]);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
