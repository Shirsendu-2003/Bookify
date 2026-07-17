import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ProviderCard from "../../components/provider/ProviderCard";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ProviderDetailsModal from "../../components/provider/ProviderDetailsModal";
import {
  useSearchParams
} from "react-router-dom";

import {
  useProviders,
  useNearbyProviders,
  useSearchProviders,
} from "../../hooks/useProviders";

import {
  useUserContext,
} from "../../context/UserContext";

export default function SearchProviders() {

  const navigate = useNavigate();

  const { profile } =
    useUserContext();

  const user = profile;

  const [searchParams] =
  useSearchParams();

const [search, setSearch] =
  useState(
    searchParams.get("search") || ""
  );
  const [selectedProvider, setSelectedProvider] =
  useState(null);

  const [category, setCategory] =
    useState("");

  const {

  data,

  isLoading,

  error,

} = profile?.city

  ? useNearbyProviders(
      profile.address,
      profile.city
    )

  : search

    ? useSearchProviders(search)

    : useProviders();

  const providers = useMemo(() => {

    const list =
      data?.data?.content ||
      data?.content ||
      data ||
      [];

    const customerCity =
      user?.city?.toLowerCase() || "";

    const customerState =
      user?.state?.toLowerCase() || "";

    const getPriority = (provider) => {

  const location =
    (provider.location || "")
      .toLowerCase();

  const city =
    (provider.city || "")
      .toLowerCase();

  const state =
    (provider.state || "")
      .toLowerCase();

  // Exact city match
  if (
    customerCity &&
    (
      city === customerCity ||
      location.includes(customerCity)
    )
  ) {
    return 1;
  }

  // Same state
  if (
    customerState &&
    (
      state === customerState ||
      location.includes(customerState)
    )
  ) {
    return 2;
  }

  return 3;
};

    return [...list]

      .filter((provider) => {

       const matchesSearch =
  !search ||
  provider.name
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||
  provider.providerType
    ?.toLowerCase()
    .replaceAll("_", " ")
    .includes(search.toLowerCase()) ||
  provider.city
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||
  provider.location
    ?.toLowerCase()
    .includes(search.toLowerCase());

        const matchesCategory =

          !category ||

          provider.providerType ===
          category;

        return (
          matchesSearch &&
          matchesCategory
        );

      })

      .sort((a, b) => {

        const priorityA =
          getPriority(a);

        const priorityB =
          getPriority(b);

        if (
          priorityA !== priorityB
        ) {

          return (
            priorityA -
            priorityB
          );

        }

        // Higher Rated Provider First

        return (
          (b.averageRating || 0) -
          (a.averageRating || 0)
        );

      });

  }, [
    data,
    search,
    category,
    user,
  ]);

  const handleBook =
    (provider) => {

    

      navigate(
        `/customer/bookings/create?provider=${provider.id}`
      );

    };

  const handleView = (provider) => {

  setSelectedProvider(provider);

};

  if (isLoading) {

    return (

      <DashboardLayout>

        <Loader />

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <EmptyState
          title="Search Failed"
          description="Unable to load providers."
        />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Search Professional Service
        </h1>

      </div>

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        mb-10
      "
      >

        <Input
          placeholder="Search Professional Service..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <Select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          options={[
            {
              label: "All Categories",
              value: "",
            },
            {
              label: "Electrician",
              value: "ELECTRICIAN",
            },
            {
              label: "Plumber",
              value: "PLUMBER",
            },
            {
              label: "Cleaner",
              value: "CLEANER",
            },
            {
              label: "Painter",
              value: "PAINTER",
            },
            {
              label: "AC Repair",
              value: "AC_REPAIR",
            },
            {
              label: "Carpenter",
              value: "CARPENTER",
            },
            {
              label: "Mechanic",
              value: "MECHANIC",
            },
            {
              label: "Appliance Repair",
              value: "APPLIANCE_REPAIR",
            },
          ]}
        />

      </div>

      {

        providers.length === 0

          ? (

            <EmptyState
              title="No Professional Services Found"
              description="Try changing filters."
            />

          )

          : (

            <div
              className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
            >

              {

                providers.map(
                  (provider) => (

                    <ProviderCard

                      key={
                        provider.id
                      }

                      provider={
                        provider
                      }

                      onBook={
                        handleBook
                      }

                      onView={
                        handleView
                      }

                    />

                  )
                )

              }

            </div>

          )

      }
      <ProviderDetailsModal

  provider={selectedProvider}

  isOpen={!!selectedProvider}

  onClose={() =>
    setSelectedProvider(null)
  }

/>

    </DashboardLayout>

  );

}