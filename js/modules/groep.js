import { fetchPosts, createPost, markHerkenbaar } from "../lib/supabase.js";
import { loadJSON, saveJSON } from "../lib/storage.js";

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getGroupCode() {
  return loadJSON("group_code", "") || "";
}

function setGroupCode(code) {
  saveJSON("group_code", code.trim().toUpperCase());
}

async function refreshPosts(listEl, statusEl, groupCode) {
  try {
    const { data, offline } = await fetchPosts(groupCode);
    if (offline) {
      statusEl.textContent = "Groepsruimte offline — stel SUPABASE_ANON_KEY in (zie .env.example).";
      listEl.innerHTML = "";
      return;
    }
    statusEl.textContent = groupCode
      ? `Groep ${groupCode} — ${data.length} berichten (anoniem)`
      : `${data.length} berichten — voer groepscode in om te filteren`;
    listEl.innerHTML = data.length
      ? data
          .map(
            (p) => `
        <article class="post-card">
          <p>${escapeHtml(p.body ?? "")}</p>
          <footer>
            <button type="button" class="btn btn-ghost" data-herkenbaar="${p.id}">
              Herkenbaar (${p.herkenbaar_count ?? 0})
            </button>
          </footer>
        </article>`
          )
          .join("")
      : `<p class="empty">Nog geen berichten in deze groep.</p>`;

    listEl.querySelectorAll("[data-herkenbaar]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await markHerkenbaar(btn.dataset.herkenbaar);
          await refreshPosts(listEl, statusEl, groupCode);
        } catch (err) {
          alert(err.message);
        }
      });
    });
  } catch (err) {
    statusEl.textContent = `Fout: ${err.message}`;
  }
}

export function renderGroep(container) {
  const savedCode = getGroupCode();

  container.innerHTML = `
    <header class="module-header">
      <h2>Groepsruimte</h2>
      <p class="lead">Persoonlijk instrument + gedeelde laag: anoniem delen, herkenbaar markeren.</p>
    </header>

    <div class="groep-code-row">
      <label for="group-code">Groepscode</label>
      <input id="group-code" type="text" value="${escapeHtml(savedCode)}" placeholder="bijv. ML2026" maxlength="20" />
      <button type="button" id="group-code-save" class="btn btn-ghost">Opslaan</button>
    </div>

    <p id="groep-status" class="meta"></p>

    <form id="groep-form" class="groep-form">
      <textarea name="body" rows="3" required placeholder="Wat herken je — anoniem…"></textarea>
      <button type="submit" class="btn btn-primary">Plaatsen</button>
    </form>

    <div id="groep-posts" class="post-list"></div>
  `;

  const listEl = container.querySelector("#groep-posts");
  const statusEl = container.querySelector("#groep-status");
  const codeInput = container.querySelector("#group-code");

  let groupCode = savedCode;
  refreshPosts(listEl, statusEl, groupCode);

  container.querySelector("#group-code-save").addEventListener("click", () => {
    groupCode = codeInput.value.trim().toUpperCase();
    setGroupCode(groupCode);
    refreshPosts(listEl, statusEl, groupCode);
  });

  container.querySelector("#groep-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = fd.get("body")?.toString().trim();
    if (!body) return;
    if (!groupCode) {
      alert("Voer eerst een groepscode in.");
      return;
    }
    try {
      await createPost(body, groupCode);
      e.target.reset();
      await refreshPosts(listEl, statusEl, groupCode);
    } catch (err) {
      alert(err.message);
    }
  });
}
