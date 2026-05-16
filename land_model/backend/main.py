from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from backend.database import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Web GIS backend running"}

@app.get("/survey")
def get_survey():
    try:
        sql = """
        SELECT json_build_object(
            'type','FeatureCollection',
            'features', json_agg(
                json_build_object(
                    'type','Feature',
                    'geometry', ST_AsGeoJSON(geometry)::json,
                    'properties', to_jsonb(row) - 'geometry'
                )
            )
        )
        FROM (
            SELECT *
            FROM survey
            WHERE ST_YMax(geometry) <= 90
              AND ST_YMin(geometry) >= -90
              AND ST_XMax(geometry) <= 180
              AND ST_XMin(geometry) >= -180
        ) row
        """

        with engine.connect() as conn:
            result = conn.execute(text(sql)).scalar()

        return result

    except Exception as e:
        return {"error": str(e)}