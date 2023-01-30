import { Destination } from "@/types/destination";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEdit,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Breadcrumbs } from "../global";
import useSWR from "swr";
import Card from "./Card";
import { useEffect, useState } from "react";
import MyModal from "./DateModal";
import { useTodayDate } from "@/hooks/useTodayDate";
import DateModal from "./DateModal";
import TicketModal from "./TicketModal";

type Props = {
  destination: Destination;
};
const Listing = ({ destination }: Props) => {
  const router = useRouter();
  const { todayDate } = useTodayDate();

  const [departureDate, setDepartureDate] = useState(todayDate);
  const [returnDate, setReturnDate] = useState(todayDate);
  const [ticketAmount, setTicketAmount] = useState(1);

  useEffect(() => {
    if (!destination) return;

    if (departureDate === "") {
      setDepartureDate(todayDate);
      setReturnDate(todayDate);
      return;
    }

    const date = new Date(departureDate);
    date.setDate(date.getDate() + destination.durationValue + 1);

    // Format the date to YYYY-MM-DD
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    const returnDate = yyyy + "-" + mm + "-" + dd;

    setReturnDate(returnDate);
  }, [todayDate, departureDate, destination]);

  if (!destination) {
    return (
      <div className="min-h-screen w-full p-8">
        <div className="flex w-full flex-col items-center justify-center gap-y-2">
          <div className="flex h-96 items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        </div>
      </div>
    );
  }

  const { title, distance, duration, cost, image, overview } = destination;

  return (
    <div className="min-h-screen  px-6 pb-16 lg:px-12 lgg:px-24 xl:px-52">
      <div className="mt-8 mb-4 flex items-center justify-between">
        <button
          onClick={() => router.push("/destinations")}
          className="flex items-center gap-x-2 text-lg font-semibold text-gray-400 transition-colors hover:text-dark-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>
      <Breadcrumbs />
      <Gallery image={image} />
      <div className="relative mt-8 flex grid-cols-2 flex-col gap-8 md:grid">
        <div className="flex flex-col gap-y-4">
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="mt-1 text-lg text-gray-400">
              {distance} away • {duration} travel
            </p>
          </div>

          <hr id="overview" className="rounded-full border-gray-400 " />

          <ButtonGroup />

          <div className="text-gray-400">{overview}</div>

          <hr id="amenities" className="my-4 rounded-full border-gray-400" />

          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-3xl font-bold">Amenities</h2>
              <p className="mt-1 text-lg font-semibold text-gray-400">
                What this place offers.
              </p>
            </div>

            <div className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              quod, explicabo sequi repellendus facilis, cumque obcaecati,
              maiores dignissimos quisquam voluptatem eveniet accusantium fuga
              recusandae sit rem? Voluptatibus deserunt aut excepturi odio qui
              aliquam quidem cupiditate iusto obcaecati totam. Necessitatibus
              sint reprehenderit vel! Ipsam, deleniti quam nulla perspiciatis
              minus perferendis libero?
            </div>
          </div>

          <hr id="activities" className="my-4 rounded-full border-gray-400" />

          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-3xl font-bold">Activites</h2>
              <p className="mt-1 text-lg font-semibold text-gray-400">
                Things to do.
              </p>
            </div>

            <div className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              quod, explicabo sequi repellendus facilis, cumque obcaecati,
              maiores dignissimos quisquam voluptatem eveniet accusantium fuga
              recusandae sit rem? Voluptatibus deserunt aut excepturi odio qui
              aliquam quidem cupiditate iusto obcaecati totam. Necessitatibus
              sint reprehenderit vel! Ipsam, deleniti quam nulla perspiciatis
              minus perferendis libero?
            </div>
          </div>

          <hr id="safety" className="my-4 rounded-full border-gray-400" />

          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-3xl font-bold">Safety</h2>
              <p className="mt-1 text-lg font-semibold text-gray-400">
                Our number one priority.
              </p>
            </div>

            <div className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              quod, explicabo sequi repellendus facilis, cumque obcaecati,
              maiores dignissimos quisquam voluptatem eveniet accusantium fuga
              recusandae sit rem? Voluptatibus deserunt aut excepturi odio qui
              aliquam quidem cupiditate iusto obcaecati totam. Necessitatibus
              sint reprehenderit vel! Ipsam, deleniti quam nulla perspiciatis
              minus perferendis libero?
            </div>
          </div>

          <hr className="my-4 rounded-full border-gray-400" />
        </div>

        <div className="">
          <div className="relative flex flex-col gap-y-4 rounded-lg bg-dark-background p-7 md:top-16">
            <h2>
              <span className="text-4xl font-bold">{cost}</span>{" "}
              <span className="ml-1 text-lg font-medium text-gray-400">
                per ticket
              </span>
            </h2>

            <div className="grid grid-cols-1 grid-rows-3 rounded-lg xsm:grid-cols-2 xsm:grid-rows-2 ">
              <div className="relative col-span-1 row-span-1 flex items-center justify-between rounded-tl-lg rounded-tr-lg border border-gray-400 px-3 py-2 xsm:rounded-tr-none">
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    DEPARTURE
                  </div>
                  <div>{departureDate}</div>
                </div>

                <DateModal setDate={setDepartureDate}>
                  <button className="flex items-center justify-center rounded-full transition-transform hover:bg-background">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="p-3 text-xl text-white transition-transform active:scale-90"
                    />
                  </button>
                </DateModal>
              </div>
              <div className="col-span-1 row-span-1 flex items-center justify-between border border-gray-400 px-3 py-2 xsm:rounded-tr-lg xsm:border-l-0">
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    RETURN
                  </div>
                  <div>{returnDate}</div>
                </div>
              </div>
              <div className="col-span-1 row-span-1 flex justify-between rounded-b-lg border border-t-0 border-gray-400 px-3 py-2 xsm:col-span-2 xsm:row-span-2">
                <div>
                  <div className="text-sm font-semibold text-gray-400">
                    TICKETS
                  </div>
                  <div>
                    {ticketAmount} {ticketAmount > 1 ? "tickets" : "ticket"}
                  </div>
                </div>

                <TicketModal setTicketAmount={setTicketAmount}>
                  <button className="flex items-center justify-center rounded-full transition-transform hover:bg-background">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="p-3 text-xl text-white transition-transform active:scale-90"
                    />
                  </button>
                </TicketModal>
              </div>
            </div>

            <div className="flex flex-col gap-y-6">
              <div className="mt-4 flex flex-col gap-y-2">
                <h2 className="text-center text-2xl font-bold xsm:text-left">
                  SELECT TRAINING PACKAGE
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40  xxl:h-48 xxl:w-48 "></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-center text-2xl font-bold xsm:text-left">
                  SELECT VEHICLE
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40  xxl:h-48 xxl:w-48"></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-center text-2xl font-bold xsm:text-left">
                  SELECT RECOVERY STRATEGY
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40  xxl:h-48 xxl:w-48"></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                  <div className="h-24 w-full rounded-lg bg-gray-400 lg:h-32 lg:w-32 lggg:h-40 lggg:w-40 xxl:h-48 xxl:w-48"></div>
                </div>
              </div>
            </div>

            <Button text="Book Now" className="mt-4" />
          </div>
        </div>
      </div>

      <Recommendations exclude={title} />
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Recommendations = ({ exclude }: { exclude: string }) => {
  const { data, error, isLoading } = useSWR(
    `/api/destinations/random?exclude=${exclude}`,
    fetcher,
    { revalidateOnMount: true }
  );

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-3xl font-bold">More Destinations</h2>
        <p className="mt-1 text-lg font-semibold text-gray-400">
          Similar destinations you would love.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-between">
          {data?.map((destination: Destination, index) => (
            <Card
              key={index}
              cost={destination.cost}
              image={destination.image}
              distance={destination.distance}
              duration={destination.duration}
              title={destination.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ButtonGroup = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:grid-cols-4 sm:grid-rows-1 lg:gap-4 xl:gap-12">
      <button
        onClick={() => {
          const element = document.getElementById("overview");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center justify-center rounded bg-dark-background p-4 text-base font-semibold lg:text-lg "
      >
        Overview
      </button>
      <button
        onClick={() => {
          const element = document.getElementById("amenities");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center justify-center rounded bg-dark-background p-4 text-base font-semibold lg:text-lg"
      >
        Amenities
      </button>
      <button
        onClick={() => {
          const element = document.getElementById("activities");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center justify-center rounded bg-dark-background p-4 text-base font-semibold lg:text-lg"
      >
        Activities
      </button>
      <button
        onClick={() => {
          const element = document.getElementById("safety");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center justify-center rounded bg-dark-background p-4 text-base font-semibold lg:text-lg"
      >
        Safety
      </button>
    </div>
  );
};

const Gallery = ({ image }: { image: string }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 items-center gap-2 sm:gap-4 lg:gap-8">
      <img
        className="col-span-2 row-span-2 h-full w-full rounded-tl-lg rounded-bl-lg object-cover"
        src={image}
      />
      <img
        className="col-span-1 row-span-1 h-auto w-full  object-cover"
        src={image}
      />
      <img
        className="col-span-1 row-span-1 h-auto w-full  rounded-tr-lg object-cover"
        src={image}
      />
      <img
        className="col-span-1 row-span-1 h-auto w-full  object-cover"
        src={image}
      />
      <img
        className="col-span-1 row-span-1 h-auto w-full rounded-br-lg object-cover"
        src={image}
      />
    </div>
  );
};
export default Listing;
