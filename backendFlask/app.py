from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

# Inicializa o Flask e libera CORS
app = Flask(__name__)
CORS(app)

# Lê o CSV
df = pd.read_csv("dados.csv")

# Rota 1 - Resumo do dashboard
@app.route("/dashboard/resumo", methods=["GET"])
def resumo_dashboard():
    try:
        return jsonify({
            "saldo_total": f"R$ {df['total'].sum():.2f}",
            "funcionarios": int(df['user_total'].iloc[-1]),
            "produtos": int(df['total_products'].iloc[-1])
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota 2 - Lista de produtos
@app.route("/produtos/lista", methods=["GET"])
def lista_produtos():
    try:
        produtos = df[['top_selling', 'total', 'low_stock', 'product_count']].copy()
        produtos = produtos.rename(columns={
            'top_selling': 'produto',
            'total': 'valor',
            'low_stock': 'estoque',
            'product_count': 'vendidos'
        })
        return jsonify(produtos.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota 3 - Histórico de pedidos
@app.route("/historico/resumo", methods=["GET"])
def historico():
    try:
        return jsonify({
            "pedidos_totais": int(df['total_orders'].sum()),
            "completos": int(df['completed_orders'].sum()),
            "pendentes": int(df['pending_orders'].sum())
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota 4 - Estatísticas gerais
@app.route("/estatisticas/resumo", methods=["GET"])
def estatisticas():
    try:
        return jsonify({
            "receita_total": float(df['sales_total_revenue'].sum()),
            "clientes": int(df['user_total'].iloc[-1]),
            "novos_clientes": int(df['new_users'].sum()),
            "pedidos": int(df['total_orders'].sum())
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota 5 - Desempenho por canal
@app.route("/graficos/desempenho", methods=["GET"])
def canais():
    try:
        canais = df['channel'].value_counts(normalize=True) * 100
        return jsonify(canais.round(2).to_dict())
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Inicia o servidor
if __name__ == "__main__":
    app.run(debug=True)