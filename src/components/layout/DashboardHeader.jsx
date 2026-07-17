import { Link } from "react-router-dom";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import Button from "../common/Button";

export default function DashboardHeader({
  title = "Dashboard",
  subtitle = "",
  breadcrumbs = [],
  search = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
  selectedFilter = "",
  onFilterChange,
  actionText,
  actionIcon,
  onAction,
}) {

  return (

    <div
      className="

mb-8
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm

"
    >

      {/* TOP */}

      <div
        className="

flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-6

"
      >

        {/* LEFT */}

        <div>

          {/* BREADCRUMB */}

          {breadcrumbs.length > 0 && (

            <div className="flex flex-wrap items-center gap-2 mb-3">

              {breadcrumbs.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-2"
                >

                  {item.link ? (

                    <Link
                      to={item.link}
                      className="

text-sm
text-slate-500
hover:text-blue-600
transition

"
                    >

                      {item.label}

                    </Link>

                  ) : (

                    <span
                      className="

text-sm
font-medium
text-slate-800

"
                    >

                      {item.label}

                    </span>

                  )}

                  {index !== breadcrumbs.length - 1 && (
                    <FaChevronRight
                      className="text-xs text-slate-400"
                    />
                  )}

                </div>

              ))}

            </div>

          )}

          {/* TITLE */}

          <h1
            className="

text-3xl
font-bold
text-slate-900

"
          >

            {title}

          </h1>

          {/* SUBTITLE */}

          {subtitle && (

            <p className="mt-2 text-slate-500">

              {subtitle}

            </p>

          )}

        </div>

        {/* ACTION BUTTON */}

        {actionText && (

          <Button
            onClick={onAction}
            className="shrink-0"
          >

            {actionIcon}

            {actionText}

          </Button>

        )}

      </div>

      {/* CONTROLS */}

      {(search || filters.length > 0) && (

        <div
          className="

mt-6
flex
flex-col
md:flex-row
gap-4

"
        >

          {/* SEARCH */}

          {search && (

            <div className="relative flex-1">

              <FaSearch
                className="

absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400

"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(e)=>
                  onSearchChange?.(e.target.value)
                }
                placeholder={searchPlaceholder}
                className="

w-full
rounded-xl
border
border-slate-300
bg-slate-50
py-3
pl-11
pr-4
outline-none
transition
focus:border-blue-500
focus:ring-2
focus:ring-blue-200

"
              />

            </div>

          )}

          {/* FILTER */}

          {filters.length > 0 && (

            <select
              value={selectedFilter}
              onChange={(e)=>
                onFilterChange?.(e.target.value)
              }
              className="

rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-500
focus:ring-2
focus:ring-blue-200

"
            >

              {filters.map((filter)=>(

                <option
                  key={filter.value}
                  value={filter.value}
                >

                  {filter.label}

                </option>

              ))}

            </select>

          )}

        </div>

      )}

    </div>

  );

}