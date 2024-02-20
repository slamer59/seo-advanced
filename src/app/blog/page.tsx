// @ts-nocheck
import { BlogPostCard } from "@/components/Notion/BlogPostCard";
import CardPlaceholder from "@/components/Skeleton/Card";
import getBase64 from "lib/getLocalBase64";
import { getDatabasePublished } from "lib/notion";
import Image from "next/image";
import { Suspense } from "react";

// export const databaseId = process.env?.NOTION_DATABASE_ID ?? "NOTION_DATABASE_ID";

export const metadata: Metadata = {
  title: "Énergie Solaire au Sénégal : Transition, Astuces, et Solutions Durables",
  description: "Découvrez l'énergie solaire au Sénégal. Explorez l'énergie solaire avec nos articles. Transition énergétique, astuces pratiques, offres spéciales. Restez informé et adoptez l'énergie solaire aujourd'hui. Contactez-nous au +221 78 420 05 42.",
  canonical: "/blog",
};


async function getPosts() {
  const database = await getDatabasePublished();
  return database;
}

export default async function Page() {

  const heroImage = "https://saleor-assets.jokosun.biz/file/saleor-assets/notion/photo-1524518910477-9a1dc078365e_2500x_2_50.webp";
  const alt = "Someone installing a solar panel on a roof";

  const bluredHeroDataUrl = await getBase64(heroImage)
  const posts = await getPosts();
  return (
    <>
      <header
        className="relative flex items-center justify-center w-full overflow-hidden bg-black h-96"
      >
        <Image
          fetchPriority="high"
          loading="eager"
          decoding="async"
          data-nimg="fill"
          src={heroImage}
          alt={alt}
          className="opacity-70"
          // sizes={sizes}
          // srcset={imagesrcset}
          width={1250}
          height={834}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            objectFit: "cover",
            color: "transparent"
          }}
          placeholder="blur"
          blurDataURL={`data:image/png;base64,${bluredHeroDataUrl}`}
          priority
        />

        <div className="flex flex-col items-center justify-center px-3">
          <h1 className="block mt-5 overflow-hidden text-5xl font-extrabold text-center text-white opacity-90">
            Notre vision, nos astuces
          </h1>
        </div>
      </header>
      <main className="container">
        <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Transition vers l'énergie solaire : Commencez dès maintenant</h2>
            <div>Découvrez les raisons pour passer à l'énergie solaire.
              Trouvez des informations sur les avantages de l'énergie photovoltaïque, tels que la réduction de la facture d'électricité et l'indépendance énergétique.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Comprendre l'électricité solaire et l'autoconsommation</h2>
            <div>Explorez les aspects techniques de votre installation solaire.
              Apprenez les principes fondamentaux de l'électricité solaire et découvrez comment fonctionnent les panneaux solaires.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Sélectionner les Meilleurs Équipements Solaires</h2>
            <div>Consultez des comparatifs détaillés sur les équipements solaires pour prendre des décisions éclairées.
              Obtenez des informations sur divers produits photovoltaïques, des batteries solaires aux onduleurs.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Évaluation des Marques Solaires</h2>
            <div>Obtenez un aperçu des différentes marques et de leurs produits.
              Découvrez l'histoire des entreprises, leurs produits phares et les avis d'experts.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Planification et Préparation de Votre Projet Solaire</h2>
            <div>Accédez à des ressources pour planifier votre installation solaire, y compris le dimensionnement et le choix du nombre de panneaux solaires nécessaires.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Réalisation des Procédures Administratives</h2>
            <div>Explorez les démarches administratives nécessaires pour installer votre kit solaire, y compris les aspects juridiques et fiscaux.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Installation de Votre Kit Solaire</h2>
            <div>Obtenez des conseils pratiques pour l'assemblage et l'installation de votre kit solaire, quels que soient votre niveau d'expérience.
              Options d'Installation des Panneaux Solaires
              Découvrez différentes méthodes d'installation de panneaux solaires, de la toiture aux pergolas et aux bâtiments agricoles.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Vivre Quotidiennement avec Votre Système Solaire</h2>
            <div>Apprenez à entretenir votre kit solaire au quotidien, de la protection des panneaux à l'optimisation de la production d'énergie.</div>
          </div>
          <div>
            <h2 className="my-5 text-4xl font-bold text-primary">Exploration des Horizons Solaire</h2>
            <div>Explorez des sujets liés à l'énergie solaire, tels que les technologies futures des panneaux solaires, les utilisations innovantes et les formations pour devenir installateur certifié.</div>
          </div>
        </div>
        <div className="container mt-10 border-t border-dashed dark:border-gray-400">
          <h2 className="my-5 text-4xl font-bold text-primary">Tous nos articles</h2>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3 ">
            {posts && posts.map((post) => <Suspense fallback={<CardPlaceholder />}>
              <BlogPostCard post={post} key={post.id} />
            </Suspense>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
