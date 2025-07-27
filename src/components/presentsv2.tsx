import {Card, CardHeader, CardFooter, Image, Button} from "@heroui/react";

export default function App() {
  const getImageBasePath = () => {
    const baseUrl = import.meta.env.BASE_URL || "";
    if (baseUrl.includes("dhyegotourinho") || window.location.href.includes("dhyegotourinho")) {
      return "https://dhyegotourinho.github.io/lista-de-presentes/";
    }
    return "/";
  };

  const basePath = getImageBasePath();

  const list = [
    {
      title: "Fones",
      img: `${basePath}images/fones_de_ouvido.png`,
      price: "R$179.00",
      link: "https://www.kabum.com.br/produto/616939/headset-gamer-havit-h2002d-drive-53mm-3-5mm-preto-e-vermelho?utm_source=chatgpt.com",
    },
    {
      title: "Mesa para computador",
      img: `${basePath}images/mesa_para_computador.png`,
      price: "R$219.00",
      link: "https://www.mercadolivre.com.br/mesa-para-computador-diretor-estilo-industrial-150m-preto/p/MLB37927612?pdp_filters=item_id%3AMLB3589319951&from=gshop&matt_tool=71021180&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22090354475&matt_ad_group_id=173090605156&matt_match_type=&matt_network=g&matt_device=c&matt_creative=727882732797&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735098660&matt_product_id=MLB37927612-product&matt_product_partition_id=2391398191805&matt_target_id=pla-2391398191805&cq_src=google_ads&cq_cmp=22090354475&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090354475&gbraid=0AAAAAD93qcA5gryHcQneiiZKU4CccBSDa&gclid=Cj0KCQjwkILEBhDeARIsAL--pjxBlC9L_JrNBNohsxL7VXQ2mvhySR2NuBNzfaPW5fyRXbaaQkFsqbIaAhFVEALw_wcB",
    },
    {
      title: "Memória SSD",
      img: `${basePath}images/memoria_ssd.png`,
      price: "R$400.00",
      link: "https://www.mercadolivre.com.br/ssd-1tb-sata-iii-25-pol-crucial-bx500-ct1000bx500ssd1-velocidade-de-leitura-ate-540mbs-disco-solido-interno/p/MLB45902515?pdp_filters=item_id%3AMLB5318993288&from=gshop&matt_tool=91562990&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22090193891&matt_ad_group_id=174661985404&matt_match_type=&matt_network=g&matt_device=c&matt_creative=727914181114&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735098639&matt_product_id=MLB45902515-product&matt_product_partition_id=2389849485245&matt_target_id=pla-2389849485245&cq_src=google_ads&cq_cmp=22090193891&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090193891&gbraid=0AAAAAD93qcDaibo-RM1aRQmZ9Ly6NiInx&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzRmuYWrEpl71u8vIhcY6QHj05XhQSnedu_0YiQK-Z5S-JwOg5rQr4hoCRScQAvD_BwE"
    },
    {
      title: "Controle sem fio",
      img: `${basePath}images/controle.png`,
      price: "R$230.00",
      link: "https://www.mercadolivre.com.br/controle-gamer-8bitdo-ultimate-2c-bluetoothwireless/p/MLB44810264?pdp_filters=item_id%3AMLB4131883901&from=gshop&matt_tool=61959346&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22090354253&matt_ad_group_id=173090554956&matt_match_type=&matt_network=g&matt_device=c&matt_creative=727882729344&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735125422&matt_product_id=MLB44810264-product&matt_product_partition_id=2443699589927&matt_target_id=pla-2443699589927&cq_src=google_ads&cq_cmp=22090354253&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090354253&gbraid=0AAAAAD93qcBTup5e4qpc5s8-Kr1iSlLvp&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzVjVegV8Vz-xa0j8U7-fIqxKpLey_0XJzBKKYWKSRavU9zBDp8GQmxoCNwYQAvD_BwE",
    },
    {
      title: "Cadeira Confort",
      img: `${basePath}images/cadeira.png`,
      price: "R$450.00",
      link: "https://produto.mercadolivre.com.br/MLB-3839941379-cadeira-para-escritorio-ergonmica-ajustavel-com-rodinhas-_JM?matt_tool=29425971&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22090354064&matt_ad_group_id=173090531436&matt_match_type=&matt_network=g&matt_device=c&matt_creative=727882727271&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=5429835501&matt_product_id=MLB3839941379&matt_product_partition_id=2388009794866&matt_target_id=pla-2388009794866&cq_src=google_ads&cq_cmp=22090354064&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090354064&gbraid=0AAAAAD93qcB5MznsEzjQln11f4SJWfswO&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzSJ6KNVYu973oxTgUa-U0pUsq2sECw0c3wJXUYrVGi4T-nk0Ji3hdRoCzdMQAvD_BwE",
    },
    {
      title: "Calça Jeans",
      img: `${basePath}images/calca.png`,
      price: "R$80.00",
      link: "https://br.shein.com/ark/3715?goods_id=25428607&test=5051&url_from=adhub409734741&scene=1&pf=google&ad_type=DPA&language=pt-br&siteuid=br&landing_page_id=3715&ad_test_id=38925&requestId=olw-4vs5u2q68co1&cid=22660949189&gad_source=1&skucode=I6o2a4r00t30&onelink=0/googlefeed_br&network=g&gad_campaignid=22660949189&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzcm856B2LqHXahrDBuGhLw0cyrs27JNPjft6qT5DKU4gH3oL3sY9uRoCkmcQAvD_BwE&adid=757526487527&geoid=9217972&gbraid=0AAAAADm0yO4-suTXMJwunR0K9nbj1FMKS&setid=180845298196&kwd=pla-331996562063&currency=BRL&lang=pt",
    },
    {
      title: "Kit 2 cuecas Puma",
      img: `${basePath}images/cueca.png`,
      price: "R$60.00",
      link: "https://www.lojasrenner.com.br/p/kit-02-cuecas-boxer-em-algodao-com-cos-elastico-puma/-/A-583179486-br.lr?sku=583179582&p=refreshContent&gad_source=1&gad_campaignid=18252650766&gbraid=0AAAAADomBMn1PK8q-T4jn5QyQBEHEtZZY&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzVf_JML50aIoBMiwC57RO0ewQQrJRCZX1gurb-dZWzjHr4WEfeWiVBoCO7AQAvD_BwE",
    },
    {
      title: "Furadeira",
      img: `${basePath}images/furadeira.png`,
      price: "R$150.00",
      link: "https://www.mercadolivre.com.br/kit-parafusadeira-furadeira-de-impacto-profissional-com-luz-2-baterias-24v-com-maleta-acessorios/p/MLB45746059?pdp_filters=item_id%3AMLB3952584487&from=gshop&matt_tool=56938998&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22090193672&matt_ad_group_id=174661944604&matt_match_type=&matt_network=g&matt_device=c&matt_creative=727914178240&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735128188&matt_product_id=MLB45746059-product&matt_product_partition_id=2388009258146&matt_target_id=pla-2388009258146&cq_src=google_ads&cq_cmp=22090193672&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090193672&gbraid=0AAAAAD93qcBK01hZkTSByb4_cE6SEQT-0&gclid=CjwKCAjw1ozEBhAdEiwAn9qbzQxcdJ9MU5cBajre9YRbYuZ609UoGd9xVHZ5KSA58R6WSC6fIrGf7BoCkL4QAvD_BwE"
    },
  ];

  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      {/* {list.map((item, index) => (
        // <Card 
        //   key={index} 
        //   isPressable 
        //   shadow="sm" 
        //   onPress={() => console.log("item pressed")}
        //   className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-[300px]"
        // >
        //   <a
        //     href={item.link}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //     className="block h-full"
        //   >
        //     <CardHeader className="absolute z-10 top-1 flex-col items-start">
        //       <p className="text-tiny text-white/60 uppercase font-bold">Lista de Presentes</p>
        //       <h4 className="text-white font-medium text-large">{item.title}</h4>
        //     </CardHeader>
        //     <Image
        //       removeWrapper
        //       alt={item.title}
        //       className="z-0 w-full h-full object-cover"
        //       src={item.img}
        //     />
        //     <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600">
        //       <div className="flex grow gap-2 items-center">
        //         <div className="flex flex-col">
        //           <p className="text-tiny text-white/60">{item.title}</p>
        //           <p className="text-tiny text-white font-bold">{item.price}</p>
        //         </div>
        //       </div>
        //       <Button radius="full" size="sm" color="primary">
        //         Ver
        //       </Button>
        //     </CardFooter>
        //   </a>
        // </Card> */}
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col items-start!">
          <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
          <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={`${basePath}images/cueca.png`}
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col items-start!">
          <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
          <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={`${basePath}images/furadeira.png`}
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col items-start!">
          <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
          <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-2.jpeg"
        />
      </Card>
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-black font-medium text-2xl">Acme camera</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://heroui.com/images/card-example-6.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
          <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://heroui.com/images/card-example-5.jpeg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://heroui.com/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
