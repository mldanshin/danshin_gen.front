"use client";

import dictFilter from "@/dictionaries/ru/people/filter.json";
import dictOrder from "@/dictionaries/ru/people/order.json";
import Image from "next/image";
import Loading from '@/components/loading';
import OrderTypes from "@/components/people/order-types.json";
import PersonList from "./person-list";
import PeopleVisibilityContext from '@/components/people/visibility-context';
import ThemeContext from '@/components/theme/theme-context';
import { useContext } from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function People() {
    const [isLoading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const orderQuery = searchParams.get("people_order");
    const searchQuery = searchParams.get("people_search");
    
    const [search, setSearch] = useState(searchQuery ? searchQuery : "");
    const [order, setOrder] = useState(orderQuery ? orderQuery : "name");
    const [people, setPeople] = useState(null);

    const pathName = usePathname();

    const router = useRouter();

    useEffect(() => {
        updatePeople(search, order);
    }, [search, order])

    const { peopleVisibility, changeVisibility } = useContext(PeopleVisibilityContext);
    const { theme } = useContext(ThemeContext);

    async function updatePeople(searchArg, orderArg) {
        setLoading(true);

        const res = await fetch("/api/people" + getRequest(searchArg, orderArg));

        if (res.ok) {
            const json = await res.json();
            setPeople(json);
            setLoading(false);
        } else {
            setLoading(false);
            throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
        }
    }

    function getRequest(searchArg, orderArg) {
        let str = "";
    
        if (orderArg || searchArg) {
            str += "?";
        }
    
        if (orderArg) {
            str += "people_order=" + orderArg;
        }
    
        if (orderArg && searchArg) {
            str += "&";
        }
    
        if (searchArg) {
            str += "people_search=" + searchArg;
        }
    
        return str;
    }

    return (
        <aside className="aside" style={peopleVisibility.stylePeople}>
            <button type="button" onClick={() => changeVisibility()}>
                <Image src={theme.iconPeopleClose} alt="close button" width={30} height={30} />
            </button>
            <form className="filter-order-form"
                onSubmit={(event) => {
                    event.preventDefault()
                }}
                >
                <input id="people_search"
                    type="search"
                    placeholder={dictFilter.search.placeholder}
                    onChange={event => {
                        let searchArg = event.target.value;
                        setSearch(searchArg);
                        updatePeople(searchArg, order);
                        router.replace(pathName + getRequest(
                            searchArg,
                            order
                        ));
                    }}
                    value={search}
                >
                </input>
                <div className="order-container">
                    <div>{dictOrder.title}</div>
                    <ul className="order-list">
                        {OrderTypes.map(item =>
                            <li key={Math.random()}>
                                <input 
                                    type="radio"
                                    id={"people_order_" + item.alias}
                                    value={item.alias}
                                    checked={(item.alias === order) ? true : false}
                                    onChange={event => {
                                        let orderArg = event.target.value;
                                        setOrder(orderArg);
                                        updatePeople(search, orderArg);
                                        router.replace(pathName + getRequest(
                                            search,
                                            orderArg
                                        ));
                                    }}
                                    />
                                <label htmlFor={"people_order_" + item.alias}>
                                    {dictOrder.types[item.alias].label}
                                </label>
                            </li>
                        )}
                    </ul>
                </div>
            </form>
            {isLoading ?
                <Loading />
                :
                <PersonList people={people} />
            }
        </aside>
    )
}
