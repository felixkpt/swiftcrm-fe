import AutoTabs from "@/components/AutoTabs";
import Topics from "./Tabs/Topics";
import Categories from "./Tabs/Categories";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { DocsInterface } from "@/interfaces/UncategorizedInterfaces";
import { useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import AutoModal from "@/components/AutoModal";
import Docs from "./Tabs/Docs";

export default function Index(): JSX.Element {

  const [category, setCategory] = useState<DocsInterface>()

  const { slug } = useParams()

  const { data, loading, get } = useAxios()

  useEffect(() => {

    if (slug && !data)
      get(`/admin/docs/categories/${slug}`)
    else {
      const { data: data2, ...others } = data
      setCategory(data2)
      setModelDetails2(others)
    }

  }, [slug, data])

  const [modelDetails2, setModelDetails2] = useState({})

  const tabs = [
    {
      name: "Docs",
      link: "docs",
      content: <Docs category={category} />,
    },
    {
      name: "Categories",
      link: "categories",
      content: <Categories category={category} />,
    },
    {
      name: "Topics",
      link: "topics",
      content: <Topics category={category} />,
    },
  ];

  return (
    <div className="mb-3">
      {category ?
        (
          <>
            <PageHeader title={category.title} action="button" actionText="Edit Category" actionTargetId="EditCat" permission='/admin/docs/categories' />

            <AutoTabs key={slug} tabs={tabs} active="docs" />
            {
              Object.keys(modelDetails2).length > 0 && <><AutoModal record={category} modelDetails={modelDetails2} actionUrl={`/admin/docs/categories/${category.id}`} id='EditCat' /></>
            }
          </>
        )
        :
        <div>Loading...</div>
      }

    </div>
  );
}
