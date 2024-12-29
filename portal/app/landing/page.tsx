import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/hero.png";
import home from "@/public/home.png";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";

function Overview() {
  return (
    <div className="landing-page">
      <div className="hero-section flex mt-28 w-full relative justify-between items-center">
        <div className="hero-text flex flex-col ">
          <div className="flex flex-col gap-4">
            <h1 className="capitalize">
              Making <b>payments</b> easy, so you can focus on innovation
            </h1>

            <p>
              With MzuniPay, secure payments are just a click aaway. Free,
              simple , and built for Mzuzu University students
            </p>

            <Link href="/landing/dev" className="cta">
              Get started
              <IconChevronRight />
            </Link>
          </div>

          <div className="features-container flex gap-8 pt-5 items-center">
            <span>
              <span>
                <IconCheck />
              </span>
              Free to use
            </span>

            <span>
              <span>
                <IconCheck />
              </span>
              Secure payments
            </span>

            <span>
              <span>
                <IconCheck />
              </span>
              Easy integration
            </span>
          </div>
        </div>

        <Image
          height={800}
          width={1000}
          alt="hero"
          className="hero-image"
          src={heroImage}
        />
      </div>

      <div className="getting-started flex">
        <div className="flex flex-col gap-2">
          <b>Start using MzuniPay</b>

          <span className="step">
            <span>1</span>
            Create an account
          </span>

          <span className="step">
            <span>2</span>
            Choose your account type
          </span>

          <span className="step">
            <span>3</span>
            Deposit funds into your account
          </span>

          <span className="step">
            <span>4</span>
            Now you&apos;re ready to make payments
          </span>
        </div>

        <Image src={home} alt="screenshot of home" />
      </div>

      <div className="features flex mb gap-2 flex-col" id="features">
        <div className="ft">
          <div className="video">
            <video
              src="/videos/transfer.mp4"
              controls={true}
              loop={true}
              autoPlay={true}
              className="transfer-video"
            />
          </div>
          <div className="text">
            <b>Wallet to Wallet Transfer</b>

            <p>
              Are your friends or family low on balance but need to make an
              online purchase? Save the day by sharing some of your balance
              directly to their wallet—completely free and secure, with no
              transaction fees!
            </p>
          </div>
        </div>

        <div className="ft">
          <div className="text">
            <b>E-commerce</b>

            <ul className="list-disc pl-5">
              <li>
                Pay for your favorite online services and products as a customer
              </li>

              <li>
                Accept payments on your ecommerce platforms easily and and free
                of charge as a merchant
              </li>
            </ul>
          </div>
          <div className="video">
            <video
              src="/videos/e-commerce.mp4"
              controls={true}
              loop={true}
              autoPlay={true}
              preload="true"
              
              className="transfer-video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
