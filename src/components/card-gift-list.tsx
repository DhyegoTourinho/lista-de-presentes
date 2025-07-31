import {Card, CardBody, CardFooter, Image} from "@heroui/react";
interface Gift {
    title: string;
    img: string;
    price: string;
    link: string;}

interface CardGiftListProps {
    gift: Gift
}

export default function CardGiftList({gift}: CardGiftListProps) {
return (
    <Card  isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <a
          href={gift.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          > 
            <CardBody className="overflow-visible p-0">
              <Image
                alt={gift.title}
                className="h-full object-cover h-[250px]"
                radius="lg"
                shadow="sm"
                src={gift.img}
                width="100%"
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{gift.title}</b>
              <p className="text-default-500"> {gift.price}</p>
            </CardFooter>
          </a>
        </Card>
)
}